import BlogForm from "../components/BlogForm";

const CreatePage = ({ addToast }) => {
  return (
    <div>
      <BlogForm addToast={addToast} />
    </div>
  );
};

export default CreatePage;