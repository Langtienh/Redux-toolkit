import CreatePost from "@/components/slice/CreatePost";
import PostList from "@/components/slice/PostList";

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
