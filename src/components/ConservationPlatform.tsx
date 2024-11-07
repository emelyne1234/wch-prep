import Image from 'next/image';

const ConservationPlatform = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="pe-lg-4">
            <h2 className="h3 mb-4">Our Conservation Platform</h2>
            <p className="text-muted">
              Our platform was created with the belief that effective conservation requires a collaborative approach, 
              where knowledge, resources, and passion come together to make a difference. We bring together 
              conservationists, researchers, educators, and the public, uniting people from diverse backgrounds 
              to address urgent wildlife and environmental challenges.
            </p>
            <p className="text-muted">
              Through innovative tools, educational resources, and community-driven projects, we aim to empower 
              individuals to contribute to preserving biodiversity and safeguarding ecosystems for future 
              generations. Together, we can amplify our collective impact and drive meaningful change in 
              wildlife conservation.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="position-relative rounded overflow-hidden shadow-lg" style={{ height: '400px' }}>
            <Image
              src="/elephants.jpg"
              alt="Elephants walking through savanna landscape"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConservationPlatform; 