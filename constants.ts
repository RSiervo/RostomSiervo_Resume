
import { ResumeData } from './types';

export const MOCK_RESUME: ResumeData = {
  name: "ROSTOM A. SIERVO",
  title: "Information Technology / Web Developer",
  profilePicture: "/profile.jpg",
  email: "rostomdevdotnet@gmail.com",
  phone: "+6393-0070-3129",
  location: "Commonwealth Quezon City, 1121",
  website: "rostomdevdotnet-portfolio.vercel.app",
  summary: "A highly motivated and detail-oriented Information Technology graduate (Cum Laude) major in Programming, with strong passion for Networking and Computer Troubleshooting. Seeking a challenging position where I can apply my skills in hardware and software support, network configuration, DNS and Active Directory management, and contribute to maintaining efficient IT systems while continuously developing my technical expertise and professional growth.",
  experiences: [
    {
      company: "Total Information Management Corporation",
      role: "TECHNICAL SUPPORT ENGINEER",
      period: "2024 – PRESENT",
      location: "Quezon City, PH",
      description: [
        "Provide technical assistance and support to end users across hardware, software, and network systems to ensure optimal IT operations.",
        "Diagnose and resolve hardware and software issues for desktops, laptops, and peripherals.",
        "Manage and configure network devices including routers, switches, and access points.",
        "Handle DNS, DHCP, and Active Directory (AD) management for user accounts and permissions.",
        "Utilize ticketing systems to track, prioritize, and resolve user reported technical issues efficiently."
      ]
    },
    {
      company: "UEP MIS Admin",
      role: "TECH SUPPORT - INTERN",
      period: "2024",
      location: "University of Eastern Philippines",
      description: [
        "Provided technical assistance and network support within the university’s Management Information System department.",
        "Assisted in diagnosing and resolving hardware and software issues for staff and faculty.",
        "Supported network maintenance, configuration, and troubleshooting of connectivity issues.",
        "Helped manage user accounts, passwords, and permissions through Active Directory."
      ]
    },
    {
      company: "8.3 Computer Technology, Catarman",
      role: "FRONT DESK - INTERNSHIP",
      period: "2019",
      location: "Catarman, PH",
      description: [
        "Assisted in daily office and technical operations while providing front-line support to clients and staff.",
        "Supported technicians in basic computer troubleshooting and software installation.",
        "Helped maintain inventory of computer components and office supplies."
      ]
    }
  ],
  education: [
    {
      school: "UNIVERSITY OF EASTERN PHILIPPINES",
      degree: "BS Information Technology - Cum Laude",
      period: "2020 – 2024"
    },
    {
      school: "PAMBUJAN NATIONAL HIGH SCHOOL",
      degree: "SHS: TVL-ICT - With Honor",
      period: "2018 – 2020"
    }
  ],
  skills: [
    {
      category: "Programming & Web",
      items: ["Python", "Django Framework", "DRF API", "HTML & CSS", "Gemini AI Integration"]
    },
    {
      category: "IT Operations",
      items: ["Network Configuration", "Hardware & Software Troubleshooting", "Computer repair & maintenance", "Docker", "Network Troubleshooting"]
    },
    {
      category: "Design & Soft Skills",
      items: ["UI & UX Designer", "Communication"]
    }
  ],
  projects: [],
  certifications: [
    {
      name: "Computer System Servicing (CSS) NC II",
      issuer: "TESDA",
      description: "Certified for proficiency in assembling, configuring, and troubleshooting computer systems and networks."
    },
    {
      name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
      issuer: "Oracle",
      description: "Validated expertise in implementing CI/CD pipelines, automation, and cloud deployment using OCI tools."
    },
    {
      name: "Oracle Cloud Infrastructure 2025 Certified Networking Professional",
      issuer: "Oracle",
      description: "Demonstrated advanced knowledge in cloud networking, routing, and secure network architecture."
    },
    {
      name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
      issuer: "Oracle",
      description: "Established understanding of core OCI services and cloud architectural principles."
    },
    {
      name: "Oracle Cloud Infrastructure 2025 Certified Developer Professional",
      issuer: "Oracle",
      description: "Recognized for proficiency in developing, deploying, and debugging applications on Oracle Cloud."
    }
  ],
  references: [
    {
      name: "Danilo Isagani Masloc",
      position: "University Of Eastern Philippines",
      phone: "+639-093-002-367",
      email: "daniloisagani@gmail.com"
    },
    {
      name: "Henry Bautista",
      position: "Total Information Management Corporation",
      phone: "+639-777-122-948",
      email: "bau.henry@timcorp.net.ph"
    }
  ]
};

export const SYSTEM_INSTRUCTION = (resume: ResumeData) => `
You are a highly professional career assistant for ${resume.name}, an Information Technology graduate (Cum Laude) and current Technical Support Engineer. 

Your goal is to answer questions from recruiters or hiring managers about ${resume.name}'s professional background, technical skills (especially Python, Cloud, and Networking), and extensive Oracle certifications.

RESUME CONTENT:
${JSON.stringify(resume, null, 2)}

KEY STRENGTHS TO HIGHLIGHT:
- Cum Laude graduate with a major in Programming.
- Multiple Oracle Cloud Infrastructure (OCI) Professional Certifications (DevOps, Networking, Developer).
- TESDA CSS NC II Certified.
- Practical experience in Technical Support, Network Configuration, and Active Directory.

GUIDELINES:
1. Be professional, technical, and helpful.
2. Only provide information that is in the resume.
3. If asked about his performance, mention his academic honors (Cum Laude, With Honor).
4. If a question is not covered, politely guide them to contact ${resume.name} at ${resume.email}.
`;
