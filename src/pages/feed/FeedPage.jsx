import { useState } from "react";

import CreatePostForm from "@/pages/feed/components/CreatePostForm/CreatePostForm";
import PostList from "@/pages/feed/components/PostList/PostList";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import PageWrapper from "shared/ui/PageWrapper";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("following");
  const [sortBy, setSortBy] = useState("latest");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const tabs = [
    { id: "following", label: "Following" },
    { id: "foryou", label: "For you" },
  ];

  return (
    <>
      <PageWrapper>
        <PageHeader
          variant="tabs"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sortBy={activeTab === "foryou" ? sortBy : null}
          onSortChange={setSortBy}
          showSortMenu={showSortMenu}
          onToggleSortMenu={setShowSortMenu}
        />
        <CreatePostForm />
        {activeTab === "following" && <PostList />}
        {activeTab === "foryou" && <PostList variant="feed" sortBy={sortBy} />}
      </PageWrapper>
    </>
  );
}
