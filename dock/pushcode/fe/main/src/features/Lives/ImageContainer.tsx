function ImageContainer({ imageName, title }: any) {
  return (
    <div className="lives_item">
      <div className="lives_img">
        <img src={imageName} alt="" />
      </div>
      <span>{title}</span>
    </div>
  );
}

export default ImageContainer;
