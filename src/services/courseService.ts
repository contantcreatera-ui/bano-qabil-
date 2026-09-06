import { Course } from '../types';
import { VERIFIED_COURSES } from '../data/courses';

export const DEFAULT_COURSE_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';

/**
 * Normalizes any raw course record from external API / custom backend
 * into the standardized Course interface required by Bano Qabil.
 * Required fields: id, title, description, image, duration, category, status.
 */
export function normalizeCourse(raw: any, fallbackIndex = 0): Course {
  if (!raw || typeof raw !== 'object') {
    return {
      id: `course-${fallbackIndex || Date.now()}`,
      title: 'IT Certification Program',
      category: 'Web & Software',
      status: 'active',
      description: 'Hands-on practical curriculum taught in physical laboratories.',
      duration: '3 Months (In-Person Labs)',
      eligibility: 'Matriculation or Intermediate',
      prerequisites: 'Basic familiarity with computer operations',
      curriculum: [],
      certifiedBy: ['Alkhidmat Bano Qabil Hyderabad'],
      image: DEFAULT_COURSE_FALLBACK_IMAGE,
      icon: 'Code'
    };
  }

  // 1. id
  const id = String(
    raw.id || 
    raw._id || 
    raw.slug || 
    (raw.title ? raw.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `course-${fallbackIndex}`)
  );

  // 2. title
  const title = String(raw.title || raw.name || raw.courseName || raw.courseTitle || 'Certification Course');

  // 3. description
  const description = String(
    raw.description || 
    raw.summary || 
    raw.overview || 
    raw.details || 
    'Comprehensive physical lab training provided in Hyderabad centers.'
  );

  // 4. image
  const image = (typeof raw.image === 'string' && raw.image.trim())
    ? raw.image.trim()
    : ((typeof raw.imageUrl === 'string' && raw.imageUrl.trim())
      ? raw.imageUrl.trim()
      : ((typeof raw.thumbnail === 'string' && raw.thumbnail.trim())
        ? raw.thumbnail.trim()
        : DEFAULT_COURSE_FALLBACK_IMAGE));

  // 5. duration
  const duration = String(raw.duration || raw.trainingDuration || raw.courseDuration || '3 Months (In-Person Labs)');

  // 6. category
  const category = String(raw.category || raw.track || raw.department || 'Web & Software');

  // 7. status ('active' | 'inactive' | 'upcoming' | 'closed')
  const rawStatus = (raw.status || raw.courseStatus || raw.state || 'active').toString().toLowerCase().trim();
  let status = 'active';
  if (rawStatus === 'inactive' || rawStatus === 'archived' || rawStatus === 'disabled') {
    status = 'inactive';
  } else if (rawStatus === 'upcoming' || rawStatus === 'soon' || rawStatus === 'next_batch') {
    status = 'upcoming';
  } else if (rawStatus === 'closed' || rawStatus === 'completed') {
    status = 'closed';
  } else {
    status = 'active';
  }

  // Additional fields
  const eligibility = String(raw.eligibility || raw.criteria || raw.minEducation || 'Matriculation or Intermediate');
  const prerequisites = String(raw.prerequisites || raw.requirements || 'Basic familiarity with computer operations and typing');

  const curriculum = Array.isArray(raw.curriculum)
    ? raw.curriculum.map(String)
    : (Array.isArray(raw.syllabus) 
      ? raw.syllabus.map(String) 
      : (Array.isArray(raw.modules) ? raw.modules.map(String) : []));

  const certifiedBy = Array.isArray(raw.certifiedBy)
    ? raw.certifiedBy.map(String)
    : ['Alkhidmat Bano Qabil Hyderabad'];

  const popular = Boolean(raw.popular || raw.isPopular || raw.highDemand);
  const featured = Boolean(raw.featured || raw.isFeatured);
  const icon = String(raw.icon || 'Code');
  const level = raw.level ? String(raw.level) : undefined;
  const tags = Array.isArray(raw.tags) ? raw.tags.map(String) : undefined;

  return {
    id,
    title,
    category,
    status,
    description,
    duration,
    eligibility,
    prerequisites,
    curriculum,
    certifiedBy,
    popular,
    featured,
    image,
    icon,
    level,
    tags
  };
}

export interface FetchCoursesResult {
  courses: Course[];
  totalRaw: number;
  activeCount: number;
  source: 'api' | 'fallback';
  endpoint: string;
  error?: string;
}

/**
 * Async API service for fetching IT course catalog.
 * Supports configurable custom backend via VITE_COURSES_API_URL or local REST endpoint.
 * Always guarantees non-crashing execution by falling back safely to VERIFIED_COURSES.
 * Filters to ONLY return courses where status === 'active'.
 */
export async function fetchCourses(options?: { forceRefresh?: boolean }): Promise<FetchCoursesResult> {
  const customApiUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_COURSES_API_URL;
  
  // Prioritize configured API URL, then local public JSON endpoint, then internal api
  const endpointsToTry: string[] = [];
  if (customApiUrl) {
    endpointsToTry.push(customApiUrl);
  }
  endpointsToTry.push('/api/courses.json');
  endpointsToTry.push('/api/courses');

  let lastError: string | undefined;

  for (const endpoint of endpointsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(endpoint, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        },
        cache: options?.forceRefresh ? 'no-cache' : 'default'
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        lastError = `HTTP ${response.status} from ${endpoint}`;
        continue;
      }

      const json = await response.json();
      
      let rawList: any[] = [];
      if (Array.isArray(json)) {
        rawList = json;
      } else if (json && Array.isArray(json.data)) {
        rawList = json.data;
      } else if (json && Array.isArray(json.courses)) {
        rawList = json.courses;
      } else if (json && Array.isArray(json.results)) {
        rawList = json.results;
      }

      if (rawList.length > 0) {
        // Normalize all courses into standard schema
        const normalized = rawList.map((item, idx) => normalizeCourse(item, idx));
        // Requirement 7: Only display active courses
        const activeOnly = normalized.filter(course => course.status === 'active');

        return {
          courses: activeOnly,
          totalRaw: rawList.length,
          activeCount: activeOnly.length,
          source: 'api',
          endpoint
        };
      }
    } catch (err: any) {
      lastError = err?.message || 'Network request failed';
      // Continue to next endpoint or fallback
    }
  }

  // Graceful fallback: return verified active courses safely
  const normalizedFallback = VERIFIED_COURSES.map((item, idx) => normalizeCourse(item, idx));
  const activeFallback = normalizedFallback.filter(course => course.status === 'active');

  return {
    courses: activeFallback,
    totalRaw: VERIFIED_COURSES.length,
    activeCount: activeFallback.length,
    source: 'fallback',
    endpoint: 'local-verified-courses',
    error: lastError
  };
}
