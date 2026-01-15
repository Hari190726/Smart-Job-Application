const { sequelize, User, Job } = require('./models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const locations = [
  'Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Kolkata', 
  'Remote', 'San Francisco', 'New York', 'London', 'Singapore', 'Berlin'
];

const titles = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'DevOps Engineer',
  'UI/UX Designer', 'Data Scientist', 'Product Manager', 'QA Engineer',
  'Mobile App Developer', 'Cloud Architect', 'System Administrator'
];

const skills = [
  'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes',
  'SQL', 'MongoDB', 'TypeScript', 'Angular', 'Vue.js', 'Figma'
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSalary() {
  const min = Math.floor(Math.random() * 50) + 30; // 30-80
  const max = min + Math.floor(Math.random() * 20) + 10;
  return `$${min}k - $${max}k`;
}

function getRandomTags() {
  const numTags = Math.floor(Math.random() * 3) + 1;
  const tags = new Set();
  while (tags.size < numTags) {
    tags.add(getRandomElement(skills));
  }
  return Array.from(tags);
}

async function seedDatabase() {
  try {
    await sequelize.sync({ alter: true });

    // Ensure a recruiter exists
    let recruiter = await User.findOne({ where: { email: 'recruiter@example.com' } });
    if (!recruiter) {
      const password = await bcrypt.hash('password', 10);
      recruiter = await User.create({
        name: 'Tech Recruiter',
        email: 'recruiter@example.com',
        password: password,
        role: 'recruiter',
      });
      console.log('Created recruiter: recruiter@example.com');
    }

    // Create 50 jobs
    const jobs = [];
    for (let i = 0; i < 50; i++) {
      const title = getRandomElement(titles);
      const location = getRandomElement(locations);
      
      jobs.push({
        title: `${title} at ${location}`, // Adding location to title for variety
        description: `We are looking for a talented ${title} to join our team in ${location}. This is a great opportunity to work on cutting-edge technologies.`,
        requirements: `Must have experience with ${getRandomTags().join(', ')}. Minimum 2 years of experience required.`,
        location: location,
        salary: getRandomSalary(),
        tags: getRandomTags(),
        recruiter_id: recruiter.id,
      });
    }

    await Job.bulkCreate(jobs);

    console.log(`Successfully seeded ${jobs.length} jobs!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
