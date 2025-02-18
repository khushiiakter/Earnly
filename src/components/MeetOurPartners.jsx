import { motion } from "framer-motion";
import earnly from "../assets/icons8-money-48.png";
const partners = [
  {
    id: 1,
    name: "Bkash",
    logo: "https://i.ibb.co.com/hFNVcw43/BKash-Logo-icon.png",
    description: "Fast and secure transactions for Earnly users.",
  },
  {
    id: 2,
    name: "Rocket",
    logo: "https://i.ibb.co.com/VY7yDv5P/DBBL-Mobile-Banking-Becomes-Rocket.jpg",
    description: "Reliable mobile banking solutions for instant withdrawals.",
  },
  {
    id: 3,
    name: "Earnly Marketing",
    logo: `${earnly}`,
    description: "Boost your task visibility with targeted promotions.",
  },
  {
    id: 4,
    name: "Freelance Connect",
    logo: "https://i.ibb.co.com/wZRBJZqN/freelancer.jpg",
    description: "Helping freelancers find high-paying micro-tasks.",
  },
];

const MeetOurPartners = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-[#5f1a89] mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Trusted Partners
        </motion.h2>
        <motion.p
          className="text-gray-700 mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          We collaborate with top payment providers, marketing agencies, and freelance networks to enhance your Earnly experience.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center border border-[#5f1a89]"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-xl font-bold text-[#5f1a89]">
                {partner.name}
              </h3>
              <p className="text-gray-700 font-medium text-base mt-2">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurPartners;
