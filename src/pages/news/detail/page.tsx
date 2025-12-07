import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlobalNav from '../../../components/feature/GlobalNav';
import Footer from '../../../components/feature/Footer';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [language, setLanguage] = useState<'en' | 'jp'>('en');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const newsDetail = {
    id: 1,
    title: {
      en: 'FUSO Announces New Sustainability Initiative for 2025',
      jp: 'FUSOが2025年の新しい持続可能性イニシアチブを発表'
    },
    image: 'https://readdy.ai/api/search-image?query=modern%20sustainable%20green%20technology%20innovation%20in%20automotive%20industry%20with%20clean%20energy%20solutions%20eco%20friendly%20manufacturing%20facility%20professional%20corporate%20setting%20dark%20background%20wide%20angle&width=1200&height=600&seq=newsdetail001&orientation=landscape',
    author: {
      name: 'Corporate Communications',
      avatar: 'CC',
      role: 'Communications Team'
    },
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['Sustainability', 'Innovation', 'Corporate', 'Green Technology'],
    likes: 234,
    comments: 45,
    shares: 67,
    views: 1523,
    content: {
      en: `
        <p>FUSO is proud to announce our comprehensive sustainability roadmap aimed at reducing carbon emissions by 40% over the next five years through innovative green technologies and manufacturing processes.</p>
        
        <h2>Our Vision for a Sustainable Future</h2>
        <p>As a leading automotive manufacturer, we recognize our responsibility to contribute to a more sustainable future. Our new initiative represents a significant commitment to environmental stewardship and innovation in green technology.</p>
        
        <h2>Key Initiatives</h2>
        <ul>
          <li><strong>Electric Vehicle Development:</strong> Accelerating our EV program with new models launching in 2025</li>
          <li><strong>Manufacturing Efficiency:</strong> Implementing AI-powered systems to reduce waste by 35%</li>
          <li><strong>Renewable Energy:</strong> Transitioning all facilities to 100% renewable energy by 2027</li>
          <li><strong>Supply Chain Optimization:</strong> Working with partners to reduce carbon footprint across the entire supply chain</li>
        </ul>
        
        <h2>Investment and Timeline</h2>
        <p>This initiative represents a $500 million investment over five years, demonstrating our long-term commitment to sustainability. We will achieve our goals through:</p>
        <ul>
          <li>Phase 1 (2025): Infrastructure upgrades and EV production expansion</li>
          <li>Phase 2 (2026-2027): Full renewable energy transition</li>
          <li>Phase 3 (2028-2029): Advanced technology implementation and optimization</li>
        </ul>
        
        <h2>Impact on Operations</h2>
        <p>These changes will transform how we operate, from design and manufacturing to distribution and customer service. Every department will play a crucial role in achieving our sustainability goals.</p>
        
        <h2>Employee Engagement</h2>
        <p>We are launching comprehensive training programs to ensure all employees understand and contribute to our sustainability objectives. This includes workshops, certifications, and innovation challenges.</p>
        
        <h2>Looking Ahead</h2>
        <p>This is just the beginning of our sustainability journey. We are committed to continuous improvement and will regularly update our stakeholders on progress toward our goals.</p>
      `,
      jp: `
        <p>FUSOは、革新的なグリーンテクノロジーと製造プロセスを通じて、今後5年間で炭素排出量を40%削減することを目指す包括的な持続可能性ロードマップを発表できることを誇りに思います。</p>
        
        <h2>持続可能な未来へのビジョン</h2>
        <p>大手自動車メーカーとして、より持続可能な未来に貢献する責任を認識しています。この新しいイニシアチブは、環境管理とグリーンテクノロジーのイノベーションへの重要なコミットメントを表しています。</p>
        
        <h2>主要イニシアチブ</h2>
        <ul>
          <li><strong>電気自動車開発:</strong> 2025年に新モデルを発売するEVプログラムの加速</li>
          <li><strong>製造効率:</strong> 廃棄物を35%削減するAI搭載システムの実装</li>
          <li><strong>再生可能エネルギー:</strong> 2027年までにすべての施設を100%再生可能エネルギーに移行</li>
          <li><strong>サプライチェーン最適化:</strong> パートナーと協力してサプライチェーン全体の炭素フットプリントを削減</li>
        </ul>
      `
    }
  };

  const relatedArticles = [
    {
      id: 2,
      title: 'Q4 2024 Results Exceed Expectations',
      image: 'https://readdy.ai/api/search-image?query=business%20success%20growth%20chart%20analytics%20dashboard%20professional%20corporate%20setting%20dark%20background&width=300&height=180&seq=related001&orientation=landscape',
      date: '2024-01-12'
    },
    {
      id: 3,
      title: 'New R&D Center Opens in Tokyo',
      image: 'https://readdy.ai/api/search-image?query=modern%20research%20development%20laboratory%20facility%20advanced%20technology%20dark%20background&width=300&height=180&seq=related002&orientation=landscape',
      date: '2024-01-10'
    },
    {
      id: 6,
      title: 'FUSO Wins Industry Excellence Award',
      image: 'https://readdy.ai/api/search-image?query=business%20award%20trophy%20ceremony%20corporate%20recognition%20dark%20background&width=300&height=180&seq=related003&orientation=landscape',
      date: '2024-01-03'
    }
  ];

  const comments = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'Engineering Manager',
      date: '2024-01-15',
      content: 'This is fantastic news! Really excited to see FUSO taking such a strong stance on sustainability. Looking forward to being part of this transformation.',
      likes: 23
    },
    {
      id: 2,
      author: 'Takeshi Yamamoto',
      avatar: 'TY',
      role: 'R&D Specialist',
      date: '2024-01-15',
      content: 'Great initiative! The investment in renewable energy and EV development shows real commitment to our future.',
      likes: 18
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <GlobalNav userRole="admin" />
      
      <div className="pt-16">
        <div className="pt-20 pb-12">
          <div className="max-w-5xl mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 animate-slide-up">
              <Link to="/" className="hover:text-red-500 transition-colors duration-200">Home</Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link to="/news" className="hover:text-red-500 transition-colors duration-200">News</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-white">Article</span>
            </div>

            {/* Article Header */}
            <div className="mb-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                {newsDetail.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-600/20 border border-red-600/30 text-red-500 text-xs font-medium rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                {newsDetail.title[language]}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {newsDetail.author.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{newsDetail.author.name}</div>
                    <div className="text-sm text-gray-400">{newsDetail.author.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <i className="ri-calendar-line"></i>
                    {newsDetail.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="ri-time-line"></i>
                    {newsDetail.readTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="ri-eye-line"></i>
                    {newsDetail.views} views
                  </span>
                </div>
              </div>
            </div>

            {/* Language Toggle & Actions */}
            <div className="flex items-center justify-between mb-8 animate-slide-up">
              <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    language === 'en'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('jp')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    language === 'jp'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  日本語
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    liked
                      ? 'bg-red-600/20 border-red-600 text-red-500'
                      : 'bg-dark-card border-dark-border text-gray-400 hover:border-red-600/50 hover:text-red-500'
                  }`}
                >
                  <i className={liked ? 'ri-heart-fill' : 'ri-heart-line'}></i>
                  <span className="text-sm font-medium">{newsDetail.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    bookmarked
                      ? 'bg-red-600/20 border-red-600 text-red-500'
                      : 'bg-dark-card border-dark-border text-gray-400 hover:border-red-600/50 hover:text-red-500'
                  }`}
                >
                  <i className={bookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'}></i>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-gray-400 rounded-lg hover:border-red-600/50 hover:text-red-500 transition-all duration-200 whitespace-nowrap cursor-pointer">
                  <i className="ri-share-line"></i>
                  <span className="text-sm font-medium">Share</span>
                </button>

                <button
                  onClick={() => setFollowing(!following)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    following
                      ? 'bg-dark-card border border-dark-border text-gray-400 hover:border-red-600/50'
                      : 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                  }`}
                >
                  <i className={following ? 'ri-user-unfollow-line' : 'ri-user-follow-line'}></i>
                  <span className="text-sm font-medium">{following ? 'Following' : 'Follow'}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-gray-400 rounded-lg hover:border-red-600/50 hover:text-red-500 transition-all duration-200 whitespace-nowrap cursor-pointer">
                  <i className="ri-file-pdf-line"></i>
                  <span className="text-sm font-medium">PDF</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-10 animate-scale-in">
              <img
                src={newsDetail.image}
                alt={newsDetail.title[language]}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Article Content */}
            <article className="bg-dark-card border border-dark-border rounded-lg p-8 mb-8">
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-white leading-relaxed space-y-4">
                  <p className="text-white">
                    In today's rapidly evolving business landscape, effective collaboration across departments has become more critical than ever. Organizations that break down silos and foster cross-functional teamwork are better positioned to innovate, adapt, and succeed in competitive markets.
                  </p>

                  <h2 className="text-2xl font-bold text-red-600 mt-8 mb-4">The Power of Cross-Functional Teams</h2>
                  
                  <p className="text-white">
                    Cross-functional teams bring together diverse perspectives, skills, and expertise from different departments. This diversity drives innovation and helps organizations solve complex problems more effectively. When marketing, product development, sales, and customer service work together seamlessly, the entire organization benefits.
                  </p>

                  <h2 className="text-2xl font-bold text-red-600 mt-8 mb-4">Key Benefits of Breaking Down Silos</h2>

                  <ul className="list-disc list-inside space-y-2 text-white ml-4">
                    <li className="text-white">Enhanced communication and information sharing across departments</li>
                    <li className="text-white">Faster decision-making processes with input from multiple stakeholders</li>
                    <li className="text-white">Improved innovation through diverse perspectives and expertise</li>
                    <li className="text-white">Better alignment of goals and objectives across the organization</li>
                    <li className="text-white">Increased employee engagement and job satisfaction</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-red-600 mt-8 mb-4">Implementing Effective Collaboration Strategies</h2>

                  <p className="text-white">
                    To successfully implement cross-functional collaboration, organizations need to establish clear communication channels, define shared goals, and create a culture that values teamwork over individual department success. Technology platforms that facilitate collaboration, such as project management tools and communication software, play a crucial role in this transformation.
                  </p>

                  <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-300 my-6">
                    "The strength of the team is each individual member. The strength of each member is the team." - Phil Jackson
                  </blockquote>

                  <h2 className="text-2xl font-bold text-red-600 mt-8 mb-4">Overcoming Common Challenges</h2>

                  <p className="text-white">
                    While the benefits are clear, implementing cross-functional collaboration isn't without challenges. Common obstacles include conflicting priorities, communication barriers, and resistance to change. Leadership must actively champion collaboration, provide necessary resources, and recognize and reward collaborative behaviors.
                  </p>

                  <h2 className="text-2xl font-bold text-red-600 mt-8 mb-4">Measuring Success</h2>

                  <p className="text-white">
                    Organizations should establish metrics to measure the effectiveness of their cross-functional initiatives. These might include project completion rates, employee satisfaction scores, innovation metrics, and customer satisfaction ratings. Regular assessment helps identify areas for improvement and demonstrates the value of collaborative efforts.
                  </p>

                  <h2 className="text-2xl font-bold text-red-600 mt-8 mb-4">Looking Ahead</h2>

                  <p className="text-white">
                    As we move forward, the ability to collaborate effectively across functions will become even more critical. Organizations that invest in building strong cross-functional teams today will be better prepared to navigate the challenges and opportunities of tomorrow's business environment.
                  </p>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-8 mb-10 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Comments ({newsDetail.comments})</h3>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="text-sm text-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer"
                >
                  {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
              </div>

              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 resize-none"
                  rows={3}
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-500">{comment.length}/500</span>
                  <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 whitespace-nowrap cursor-pointer">
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Comments List */}
              {showComments && (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-dark-hover border border-dark-border rounded-lg p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {comment.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-white font-semibold">{comment.author}</div>
                              <div className="text-xs text-gray-500">{comment.role} • {comment.date}</div>
                            </div>
                            <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                              <i className="ri-heart-line"></i>
                              <span className="text-sm">{comment.likes}</span>
                            </button>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Related Articles */}
            <div className="animate-slide-up">
              <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.id}`}
                    className="bg-dark-card border border-dark-border rounded-lg overflow-hidden hover:shadow-xl hover:shadow-red-600/20 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200">
                        {article.title}
                      </h4>
                      <span className="text-xs text-gray-500">{article.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
