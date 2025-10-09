import React from 'react';
import './App.css';
import './OurStory.css';

const teamMembers = [
  {
    name: "Manya Roongta",
    role: "Co-Founder | 17 Years",
    quote: "CAMI is a platform for the creative voice of all children in India. Here, we all come to share and grow together as artists and fellow human beings.",
    image: "https://static.wixstatic.com/media/3de004_a9006df3f7634d6cb9b34798ae26ade7~mv2.png/v1/fill/w_948,h_590,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/3de004_a9006df3f7634d6cb9b34798ae26ade7~mv2.png",
  },
  {
    name: "Krish Nawal",
    role: "Co-Founder | 15 Years",
    quote: "When you look at the worldwide web, there are hundreds of museums and art sites, but none dedicated to the works of children. CAMI is our place under the sun- for the children, by the children and of the children!",
    image: "https://static.wixstatic.com/media/3de004_3f942422099e4e1995d2f994aa1488a1~mv2.png/v1/fill/w_950,h_581,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/3de004_3f942422099e4e1995d2f994aa1488a1~mv2.png",
  },
];

const TeamSection = () => {
  return (
    <div className="team-container">
      {teamMembers.map((member, idx) => (
        <div
          className={`team-card ${idx % 2 === 0 ? 'img-left' : 'img-right'}`}
          key={idx}
        >
          <div className="team-image">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="team-text">
            <h2>{member.name}</h2>
            <h4>{member.role}</h4>
            <p>"{member.quote}"</p>
          </div>
        </div>
      ))}
      <div className='RoadMap'>
       <img src="https://static.wixstatic.com/media/3de004_a35856eaaf20476cb30e145efd8e7902~mv2.png/v1/fill/w_1918,h_1080,al_c,q_95,enc_avif,quality_auto/Green%20and%20Teal%20Simple%20Lined%20Timeline%20Cybersecurity%20Mind%20Map.png" alt="image.png" />
      </div>

      <div className='last_div'>
        <div>

          <div className="kuchbhi">
            <span>A PROUD FEATURE BY BOSTON CHILDREN'S MUSEUM</span>
          </div>
          <div className="big_and_little">
            <img src="https://static.wixstatic.com/media/3de004_5082d172b78f49a9b3d06a8d7942af51~mv2.png/v1/fill/w_226,h_230,al_c,lg_1,q_85,enc_avif,quality_auto/Boston.png" alt="img.png" />
            <img src="https://static.wixstatic.com/media/3de004_4058c3d772514196b62695d3e2ef880d~mv2.png/v1/fill/w_833,h_160,al_c,lg_1,q_85,enc_avif,quality_auto/3de004_4058c3d772514196b62695d3e2ef880d~mv2.png" alt="img.png" />
          </div>
          <div className="full_episode">
            <button>Listen Full Episode</button>
          </div>
          <div className='big_ideas'>
            <span>Young Minds, Big Ideas</span>
          </div>
        </div>
        <div>

          <div className="stiky_mid">
            <img src="https://static.wixstatic.com/media/3de004_24ed1fae7f8f4f86a4f6305312212b8e~mv2.png/v1/fill/w_1901,h_913,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/3de004_24ed1fae7f8f4f86a4f6305312212b8e~mv2.png" alt="image" />
          </div>
        </div>
        <div>
          <div>
            <h2>Important Links</h2>
            <a href="#">Help & How to upload</a>
            <a href="#">Privacy & Policy</a>
            <a href="#">Delivery Policy</a>
            <a href="#">Cancellation, Return and Refund Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Careers</a>
          </div>
          <div>
            <div>
              <div>
                <span><img src="https://static.wixstatic.com/media/11062b_8b3cbae79dcb4a55b4ec2bac32f88d96~mv2.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_8b3cbae79dcb4a55b4ec2bac32f88d96~mv2.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/11062b_aabae1939a1845e28f924e8906fa4739~mv2.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_aabae1939a1845e28f924e8906fa4739~mv2.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/11062b_8dcadfa428954b1d919f8499f75aa27a~mv2.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_8dcadfa428954b1d919f8499f75aa27a~mv2.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/48a2a42b19814efaa824450f23e8a253.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/48a2a42b19814efaa824450f23e8a253.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/8d6893330740455c96d218258a458aa4.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8d6893330740455c96d218258a458aa4.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/e316f544f9094143b9eac01f1f19e697.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e316f544f9094143b9eac01f1f19e697.png" alt="img" /></span>
              </div>
              <div>
                <div>
                  <input type="text" placeholder='Sign up for our Newsletter' />
                  <button>Sign Up</button>
                </div>
                <div>
                  <input type="checkbox" />
                  <span>I agree to the <a href="#">Privacy Policy</a></span>
                </div>
              </div>
            </div>
            <div>
              <img src="https://static.wixstatic.com/media/3de004_0d8a3c043e1d4f29b2b3b88198518c0e~mv2.png/v1/fill/w_348,h_344,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/children_museum_blogs_Feedspot-removebg-preview.png" alt="image.png" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeamSection;
