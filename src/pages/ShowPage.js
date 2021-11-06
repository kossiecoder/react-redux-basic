import { useParams } from "react-router";

const ShowPage = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Show Page</div>;
};

export default ShowPage;