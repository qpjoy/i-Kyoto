function ImageContainer({ imageName }: any) {
  return (
    <div className="projects_img">
      <img src={imageName} alt="" />
    </div>
  );
}

export default ImageContainer;
