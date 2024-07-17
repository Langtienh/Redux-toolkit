import CreatePost from "@/components/thunk/CreatePost";
import PostList from "@/components/thunk/PostList";

export default function Home() {
  return (
    <main>
      <div className="p-5">
        <CreatePost />
        <PostList />
      </div>
    </main>
  );
}
