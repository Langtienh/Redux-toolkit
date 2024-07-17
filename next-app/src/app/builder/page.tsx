import CreatePost from "@/components/builder/CreatePost";
import PostList from "@/components/builder/PostList";

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
