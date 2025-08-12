import { TodoForm } from "./components/todo-form";

const HomePage = () => {
  return (
    <div
      data-testid="home-page"
      className="min-h-screen flex items-center justify-center py-2"
    >
      <div
        data-testid="content-wrapper"
        className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl rounded-lg shadow-sm p-4"
      >
        <TodoForm />
      </div>
    </div>
  );
};

export default HomePage;
