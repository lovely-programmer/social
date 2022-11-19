import "./styles/row.scss"

type RowProp = {
  image: string;
  text: string;
};

function Row({ image, text }: RowProp) {
  return (
    <div className="row">
      <img src={image} alt="" />
      <span> {text} </span>
    </div>
  );
}

export default Row;
