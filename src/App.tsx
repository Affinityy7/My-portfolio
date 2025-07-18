import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Github, Linkedin, ExternalLink, Menu, X, ChevronDown, Database, BarChart3, TrendingUp, Award, GraduationCap, Globe } from 'lucide-react';
import SkillsFilter from './components/SkillsFilter';
import ProjectModal from './components/ProjectModal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [showAdvancedSkills, setShowAdvancedSkills] = useState(false);

  const navigation = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const skills = {
    'Data Analysis': ['Data Visualization', 'Data Cleaning', 'Statistical Analysis', 'Business Intelligence'],
    'Tools & Technologies': ['Power BI (DAX, Power Query)', 'Tableau', 'Excel (Pivot Tables, VLOOKUP)', 'SQL', 'Python (Pandas, NumPy, Matplotlib)', 'ETL'],
    'Soft Skills': ['Problem-solving', 'Attention to Detail', 'Adaptability', 'Quick Learner', 'Communication', 'Critical Thinking']
  };

  const projects = [
    {
      title: 'Excel: Zomato Data Analysis',
      description: 'Comprehensive analysis of Zomato restaurant data including data cleaning, transformation, and insight generation using advanced Excel functions.',
      tools: ['Excel', 'Pivot Tables', 'VLOOKUP', 'Data Validation'],
      icon: <BarChart3 className="w-6 h-6" />,
      details: {
        duration: '2 weeks',
        challenges: [
          'Handling large datasets with inconsistent formatting',
          'Creating dynamic pivot tables for multiple analysis views',
          'Implementing complex VLOOKUP formulas for data matching'
        ],
        outcomes: [
          'Identified top-performing restaurant categories',
          'Discovered pricing patterns across different locations',
          'Created automated reporting dashboard'
        ]
      }
    },
    {
      title: 'Power BI: Amazon Mobile Dataset',
      description: 'Interactive dashboard analyzing Amazon mobile sales data with DAX formulas and Power Query transformations.',
      tools: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
      icon: <Database className="w-6 h-6" />,
      details: {
        duration: '3 weeks',
        challenges: [
          'Complex data modeling with multiple related tables',
          'Creating advanced DAX measures for time intelligence',
          'Optimizing dashboard performance for large datasets'
        ],
        outcomes: [
          'Built interactive sales performance dashboard',
          'Implemented real-time data refresh capabilities',
          'Reduced reporting time by 75%'
        ]
      }
    },
    {
      title: 'Power BI: Global Terrorism Analysis',
      description: 'Comprehensive dashboard examining global terrorism trends and patterns with geographic visualizations.',
      tools: ['Power BI', 'DAX', 'Geographic Mapping', 'Time Series Analysis'],
      icon: <TrendingUp className="w-6 h-6" />,
      details: {
        duration: '4 weeks',
        challenges: [
          'Processing sensitive geopolitical data',
          'Creating meaningful geographic visualizations',
          'Implementing time-based trend analysis'
        ],
        outcomes: [
          'Identified global terrorism hotspots and trends',
          'Created predictive models for risk assessment',
          'Delivered insights to security research team'
        ]
      }
    },
    {
      title: 'Tableau: COVID Data Dashboard',
      description: 'Interactive COVID-19 data dashboard featuring real-time statistics, trend analysis, and geographic distribution.',
      tools: ['Tableau', 'Data Visualization', 'Dashboard Design', 'Statistical Analysis'],
      icon: <BarChart3 className="w-6 h-6" />,
      details: {
        duration: '2 weeks',
        challenges: [
          'Handling rapidly changing data sources',
          'Creating responsive visualizations for different devices',
          'Implementing real-time data updates'
        ],
        outcomes: [
          'Tracked pandemic trends across multiple regions',
          'Provided actionable insights for public health decisions',
          'Dashboard viewed by 10,000+ users'
        ]
      }
    }
  ];

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-indigo-600">Muskan Sharma</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.href.substring(1)
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-4xl font-bold shadow-lg">
                MS
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
                Muskan Sharma
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-indigo-600 font-medium mb-4 sm:mb-6">
                Data Analyst
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                Passionate about transforming data into impactful insights
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4">
              <a
                href="mailto:muskaaan.3281@gmail.com"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/ims2223"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md text-sm sm:text-base"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                LinkedIn
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm sm:text-base px-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-center">NIT Faridabad, Haryana, India</span>
            </div>

            <div className="mt-8 sm:mt-12 animate-bounce">
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 shadow-sm">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                As a recent graduate with specialized training in Data Analytics, I am eager to leverage my skill set in data visualization and problem-solving.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Seeking a challenging position where I can extract meaningful insights from data to support informed business decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Skills</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowAdvancedSkills(!showAdvancedSkills)}
                className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                {showAdvancedSkills ? 'Show Simple View' : 'Show Advanced View'}
              </button>
            </div>
          </div>
          
          {showAdvancedSkills ? (
            <SkillsFilter skills={skills} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{category}</h3>
                <div className="space-y-2 sm:space-y-3">
                  {skillList.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Data Analyst Intern</h3>
                  <p className="text-indigo-600 font-medium mb-2">Hankernest</p>
                  <p className="text-gray-600 text-sm mb-3 sm:mb-4">March 4, 2024 - August 14, 2024</p>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Supported data analysis projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Worked on data cleaning, reporting, and visualization tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Provided actionable insights for internal reports</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={() => openProjectModal(project)}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                    {project.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 min-w-0 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs sm:text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
                  <span>View Details</span>
                  <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Education & Certifications</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Education */}
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                Education
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">B.Sc. in Neurophysiology Technology</h4>
                  <p className="text-indigo-600 text-sm sm:text-base">SGT University</p>
                  <p className="text-gray-600 text-xs sm:text-sm">2019 - 2022</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">12th - ISC Board</h4>
                  <p className="text-gray-700 text-sm sm:text-base">Jiva Public School</p>
                  <p className="text-gray-600 text-xs sm:text-sm">2019</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">10th - ICSE Board</h4>
                  <p className="text-gray-700 text-sm sm:text-base">Jiva Public School</p>
                  <p className="text-gray-600 text-xs sm:text-sm">2017</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                Certifications
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Data Science Bootcamp</h4>
                  <p className="text-green-600 text-sm sm:text-base">GeeksforGeeks</p>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">From analyzing data to creating ML models</p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Data Analytics Training</h4>
                  <p className="text-green-600 text-sm sm:text-base">Madrid Software Trainings</p>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">July 2023 - February 2024</p>
                  <p className="text-gray-600 text-xs sm:text-sm">Trained in SQL, Python, Tableau, Power BI, and advanced Excel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-6 sm:mt-8 bg-gray-50 rounded-lg p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              Languages
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">Hindi (Native)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">English (Fluent)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-32 right-10 w-12 h-12 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
            <p className="text-lg sm:text-xl text-indigo-100 mt-4 max-w-2xl mx-auto px-4">
              Ready to transform your data into actionable insights? Let's connect and discuss how I can help your business make data-driven decisions.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl w-full">
            <a
              href="mailto:muskaaan.3281@gmail.com"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200 block hover:scale-105"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-indigo-100 text-sm break-all">muskaaan.3281@gmail.com</p>
                </div>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/ims2223"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200 block hover:scale-105"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Linkedin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">LinkedIn</h3>
                  <p className="text-indigo-100 text-sm">Connect with me</p>
                </div>
              </div>
            </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              © 2024 Muskan Sharma. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
      />
    </div>
  );
}

export default App;