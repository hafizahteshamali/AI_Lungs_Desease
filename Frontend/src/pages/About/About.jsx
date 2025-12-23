import { FaLightbulb, FaUsers, FaAward } from "react-icons/fa"

const About = () => {
  const team = [
    {
      name: "Dr. Raj Patel",
      role: "Chief Medical Officer",
      image: "/assets/images/home/chief-medical-officer.jpg",
    },
    {
      name: "Sarah Chen",
      role: "AI/ML Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Lead Radiologist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#007a9b] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Precious Scan</h1>
          <p className="text-xl text-blue-100">
            Revolutionizing medical diagnostics through advanced artificial intelligence
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img
              src="/assets/images/home/mission.jpg"
              alt="Our Mission"
              className="rounded-xl shadow-lg"
            />
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                We believe early detection saves lives. Our mission is to democratize access to world-class diagnostic
                AI, making it affordable and accessible to healthcare providers globally.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By combining cutting-edge machine learning with medical expertise, we're creating a future where every
                patient has access to accurate, timely diagnostics regardless of location or resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#4932e4] to-[#3a25b8] text-white p-8 rounded-xl">
              <FaLightbulb className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-3">Innovation</h3>
              <p>Continuously pushing boundaries to develop next-generation diagnostic solutions.</p>
            </div>
            <div className="bg-gradient-to-br from-[#008059] to-[#006b47] text-white p-8 rounded-xl">
              <FaUsers className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-3">Collaboration</h3>
              <p>Working with healthcare professionals to ensure our AI serves real medical needs.</p>
            </div>
            <div className="bg-gradient-to-br from-[#007a9b] to-[#005f7d] text-white p-8 rounded-xl">
              <FaAward className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-3">Excellence</h3>
              <p>Committed to achieving the highest standards in accuracy and reliability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-[#4932e4] font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#4932e4] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-blue-100">Patients Helped</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">200+</h3>
              <p className="text-blue-100">Healthcare Partners</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p className="text-blue-100">Accuracy Rate</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">25+</h3>
              <p className="text-blue-100">Countries Served</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
