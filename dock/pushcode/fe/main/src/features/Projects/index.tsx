import "./Project.css";

import ProjectImages from "./ProjectImage";
import ImageContainer from "./ImageContainer";

function ProjectSection() {
  return (
    <section className="projects section" id="projects">
      <div className="circle projects_circleOne"></div>
      <div className="circle projects_circleThree"></div>

      <h2 className="section_title">Projects</h2>

      <div className="projects_container bd_grid">
        {ProjectImages &&
          ProjectImages.map((data: any) => <ImageContainer key={data.id} imageName={data.imageName} />)}
      </div>
    </section>
  );
}

export default ProjectSection;
