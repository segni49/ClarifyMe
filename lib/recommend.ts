import axios from 'axios';

const AMAZON_ASSOCIATE_TAG = process.env.AMAZON_ASSOCIATE_TAG;
const UDEMY_API_KEY = process.env.UDEMY_API_KEY;
const COURSERA_API_KEY = process.env.COURSERA_API_KEY;

interface Recommendation {
  title: string;
  url: string;
  type: 'book' | 'course';
  affiliate: string;
}

export async function getRecommendations(topic: string): Promise<Recommendation[]> {
  // Fetch books from Google Books API
  const booksRes = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(topic)}&maxResults=3`
  );
  const books: Recommendation[] = (booksRes.data.items || []).map((item: { volumeInfo: { title: string; infoLink: string } }) => ({
    title: item.volumeInfo.title,
    url: item.volumeInfo.infoLink,
    type: 'book',
    affiliate: `https://www.amazon.com/s?k=${encodeURIComponent(item.volumeInfo.title)}&tag=${AMAZON_ASSOCIATE_TAG}`,
  }));

  // Fetch courses from Udemy API
  let courses: Recommendation[] = [];
  try {
    const udemyRes = await axios.get(
      `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(topic)}`,
      { headers: { Authorization: `Bearer ${UDEMY_API_KEY}` } }
    );
    courses = (udemyRes.data.results || []).slice(0, 3).map((course: { title: string; url: string }) => ({
      title: course.title,
      url: `https://www.udemy.com${course.url}`,
      type: 'course',
      affiliate: `https://www.udemy.com${course.url}`, // Replace with Udemy affiliate link if available
    }));
  } catch {
    courses = [];
  }

  // Fetch courses from Coursera API
  let courseraCourses: Recommendation[] = [];
  try {
    const courseraRes = await axios.get(
      `https://api.coursera.org/api/courses.v1?q=search&query=${encodeURIComponent(topic)}`,
      { headers: { Authorization: `Bearer ${COURSERA_API_KEY}` } }
    );
    courseraCourses = (courseraRes.data.elements || []).slice(0, 3).map((course: { name: string; slug: string }) => ({
      title: course.name,
      url: `https://www.coursera.org/learn/${course.slug}`,
      type: 'course',
      affiliate: `https://www.coursera.org/learn/${course.slug}`, // Replace with affiliate link if available
    }));
  } catch {
    courseraCourses = [];
  }

  return [...books, ...courses, ...courseraCourses];
}
