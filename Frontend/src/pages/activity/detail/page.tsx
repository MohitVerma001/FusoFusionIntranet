import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlobalNav from '../../../components/feature/GlobalNav';
import Footer from '../../../components/feature/Footer';

export default function ActivityDetailPage() {
  const { id } = useParams();
  const [joined, setJoined] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const activityDetail = {
    id: 1,
    title: 'Annual Team Building Workshop 2025',
    category: 'Workshop',
    image: 'https://readdy.ai/api/search-image?query=corporate%20team%20building%20workshop%20professional%20business%20training%20session%20collaborative%20activities%20modern%20conference%20room%20dark%20background%20wide%20angle&width=1200&height=600&seq=activitydetail001&orientation=landscape',
    organizer: {
      name: 'HR Department',
      avatar: 'HR',
      role: 'Human Resources'
    },
    date: '2025-02-15',
    time: '09:00 AM - 05:00 PM',
    location: 'FUSO Main Campus - Conference Hall A',
    capacity: 100,
    registered: 67,
    status: 'Open',
    tags: ['Team Building', 'Leadership', 'Communication', 'Collaboration'],
    likes: 156,
    comments: 34,
    shares: 28,
    description: `
      <p>Join us for our highly anticipated Annual Team Building Workshop designed to strengthen collaboration, enhance communication skills, and foster innovation across departments.</p>
      
      <h2>Workshop Overview</h2>
      <p>This full-day interactive workshop brings together employees from all departments to participate in engaging activities, leadership exercises, and collaborative challenges that promote teamwork and professional growth.</p>
      
      <h2>What You'll Experience</h2>
      <ul>
        <li><strong>Morning Session (9:00 AM - 12:00 PM):</strong> Leadership and communication workshops led by industry experts</li>
        <li><strong>Lunch Break (12:00 PM - 1:00 PM):</strong> Networking lunch with colleagues from different departments</li>
        <li><strong>Afternoon Session (1:00 PM - 5:00 PM):</strong> Team challenges, problem-solving activities, and collaborative projects</li>
      </ul>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>Develop stronger cross-departmental relationships</li>
        <li>Enhance communication and collaboration skills</li>
        <li>Learn effective leadership techniques</li>
        <li>Participate in fun, engaging team activities</li>
        <li>Network with colleagues across the organization</li>
      </ul>
      
      <h2>Who Should Attend</h2>
      <p>This workshop is open to all FUSO employees. Whether you're a team leader, individual contributor, or new hire, you'll find valuable insights and opportunities to connect with colleagues.</p>
      
      <h2>What to Bring</h2>
      <ul>
        <li>Comfortable clothing suitable for physical activities</li>
        <li>Notebook and pen for workshop sessions</li>
        <li>Positive attitude and enthusiasm</li>
      </ul>
      
      <h2>Registration Details</h2>
      <p>Space is limited to 100 participants. Register early to secure your spot. Lunch and refreshments will be provided throughout the day.</p>
    `,
    agenda: [
      { time: '09:00 AM', title: 'Registration & Welcome Coffee', duration: '30 min' },
      { time: '09:30 AM', title: 'Opening Keynote: The Power of Collaboration', duration: '45 min' },
      { time: '10:15 AM', title: 'Workshop: Effective Communication Strategies', duration: '90 min' },
      { time: '12:00 PM', title: 'Networking Lunch', duration: '60 min' },
      { time: '01:00 PM', title: 'Team Challenge Activities', duration: '120 min' },
      { time: '03:00 PM', title: 'Coffee Break', duration: '15 min' },
      { time: '03:15 PM', title: 'Collaborative Problem Solving Session', duration: '90 min' },
      { time: '04:45 PM', title: 'Closing Remarks & Certificates', duration: '15 min' }
    ],
    participants: [
      { name: 'Sarah Johnson', avatar: 'SJ', department: 'Engineering' },
      { name: 'Takeshi Yamamoto', avatar: 'TY', department: 'R&D' },
      { name: 'Maria Garcia', avatar: 'MG', department: 'Marketing' },
      { name: 'David Chen', avatar: 'DC', department: 'Finance' },
      { name: 'Emily Brown', avatar: 'EB', department: 'HR' },
      { name: 'Kenji Tanaka', avatar: 'KT', department: 'Operations' }
    ]
  };

  const relatedActivities = [
    {
      id: 2,
      title: 'FUSO Sports Day 2025',
      category: 'Sports',
      image: 'https://readdy.ai/api/search-image?query=corporate%20sports%20day%20outdoor%20activities%20team%20sports%20event%20professional%20business%20setting%20dark%20background&width=300&height=180&seq=relatedact001&orientation=landscape',
      date: '2025-03-10',
      participants: 89
    },
    {
      id: 3,
      title: 'Innovation Workshop Series',
      category: 'Workshop',
      image: 'https://readdy.ai/api/search-image?query=innovation%20workshop%20creative%20thinking%20session%20modern%20workspace%20collaborative%20environment%20dark%20background&width=300&height=180&seq=relatedact002&orientation=landscape',
      date: '2025-02-28',
      participants: 45
    },
    {
      id: 4,
      title: 'Community Volunteer Day',
      category: 'Volunteer',
      image: 'https://readdy.ai/api/search-image?query=corporate%20volunteer%20community%20service%20team%20helping%20activities%20professional%20setting%20dark%20background&width=300&height=180&seq=relatedact003&orientation=landscape',
      date: '2025-03-15',
      participants: 52
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <GlobalNav userRole="admin" />
      
      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 animate-slide-up">
            <Link to="/" className="hover:text-red-500 transition-colors duration-200">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/activity" className="hover:text-red-500 transition-colors duration-200">Activities</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white">Event Details</span>
          </div>

          {/* Activity Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-red-600/20 border border-red-600/30 text-red-500 text-xs font-medium rounded-md">
                {activityDetail.category}
              </span>
              <span className={`px-3 py-1 text-xs font-medium rounded-md ${
                activityDetail.status === 'Open'
                  ? 'bg-green-600/20 border border-green-600/30 text-green-500'
                  : 'bg-gray-600/20 border border-gray-600/30 text-gray-500'
              }`}>
                {activityDetail.status}
              </span>
              {activityDetail.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-dark-card border border-dark-border text-gray-400 text-xs font-medium rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              {activityDetail.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold">
                {activityDetail.organizer.avatar}
              </div>
              <div>
                <div className="text-white font-semibold">{activityDetail.organizer.name}</div>
                <div className="text-sm text-gray-400">{activityDetail.organizer.role}</div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <i className="ri-calendar-line text-red-500 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Date</div>
                    <div className="text-white font-semibold">{activityDetail.date}</div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-red-500 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="text-white font-semibold text-sm">{activityDetail.time}</div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <i className="ri-map-pin-line text-red-500 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="text-white font-semibold text-sm line-clamp-1">{activityDetail.location}</div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <i className="ri-group-line text-red-500 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Capacity</div>
                    <div className="text-white font-semibold">{activityDetail.registered}/{activityDetail.capacity}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-8 animate-slide-up">
            <button
              onClick={() => setJoined(!joined)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                joined
                  ? 'bg-dark-card border border-dark-border text-gray-400 hover:border-red-600/50'
                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40'
              }`}
            >
              <i className={joined ? 'ri-check-line' : 'ri-add-line'}></i>
              {joined ? 'Registered' : 'Join Activity'}
            </button>

            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                liked
                  ? 'bg-red-600/20 border-red-600 text-red-500'
                  : 'bg-dark-card border-dark-border text-gray-400 hover:border-red-600/50 hover:text-red-500'
              }`}
            >
              <i className={liked ? 'ri-heart-fill' : 'ri-heart-line'}></i>
              <span className="font-medium">{activityDetail.likes + (liked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                bookmarked
                  ? 'bg-red-600/20 border-red-600 text-red-500'
                  : 'bg-dark-card border-dark-border text-gray-400 hover:border-red-600/50 hover:text-red-500'
              }`}
            >
              <i className={bookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'}></i>
            </button>

            <button className="flex items-center gap-2 px-4 py-3 bg-dark-card border border-dark-border text-gray-400 rounded-lg hover:border-red-600/50 hover:text-red-500 transition-all duration-200 whitespace-nowrap cursor-pointer">
              <i className="ri-share-line"></i>
              <span className="font-medium">Share</span>
            </button>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-10 animate-scale-in">
            <img
              src={activityDetail.image}
              alt={activityDetail.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Activity Description */}
          <div className="bg-dark-card border border-dark-border rounded-lg p-8 mb-10 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6">About This Activity</h2>
            <div 
              className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-red-500 prose-headings:font-bold 
              prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 
              prose-p:text-white prose-p:leading-relaxed prose-p:mb-4 
              prose-ul:text-white prose-ul:list-disc prose-ul:pl-6 
              prose-li:mb-2 prose-li:text-white 
              prose-strong:text-red-400 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: activityDetail.description }}
            />
          </div>

          {/* Agenda */}
          <div className="bg-dark-card border border-dark-border rounded-lg p-8 mb-10 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6">Event Agenda</h2>
            <div className="space-y-4">
              {activityDetail.agenda.map((item, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-dark-border last:border-0">
                  <div className="flex-shrink-0 w-24 text-red-500 font-semibold">{item.time}</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Participants */}
          <div className="bg-dark-card border border-dark-border rounded-lg p-8 mb-10 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Participants ({activityDetail.registered})</h2>
              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="text-sm text-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer"
              >
                {showParticipants ? 'Hide All' : 'View All'}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {activityDetail.participants.slice(0, showParticipants ? undefined : 6).map((participant, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold text-lg mb-2">
                    {participant.avatar}
                  </div>
                  <div className="text-white text-sm font-medium line-clamp-1">{participant.name}</div>
                  <div className="text-xs text-gray-500">{participant.department}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Activities */}
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6">Related Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedActivities.map((activity) => (
                <Link
                  key={activity.id}
                  to={`/activity/${activity.id}`}
                  className="bg-dark-card border border-dark-border rounded-lg overflow-hidden hover:shadow-xl hover:shadow-red-600/20 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                      {activity.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200">
                      {activity.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{activity.date}</span>
                      <span className="flex items-center gap-1">
                        <i className="ri-group-line"></i>
                        {activity.participants}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
