import { useState } from "react";

import CreatePostForm from "@/pages/feed/components/CreatePostForm/CreatePostForm";
import PostList from "@/pages/feed/components/PostList/PostList";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import PageWrapper from "shared/ui/PageWrapper";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("feed_active_tab") || "foryou";
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("feed_sort_by") || "newest";
  });
  const [showSortMenu, setShowSortMenu] = useState(false);

  const tabs = [
    { id: "foryou", label: "Для вас" },
    { id: "following", label: "Підписки" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    localStorage.setItem("feed_active_tab", tabId);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    localStorage.setItem("feed_sort_by", sort);
  };

  return (
    <>
      <PageWrapper>
        <PageHeader
          variant="tabs"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          sortBy={activeTab === "foryou" ? sortBy : null}
          onSortChange={handleSortChange}
          showSortMenu={showSortMenu}
          onToggleSortMenu={setShowSortMenu}
        />
        <CreatePostForm />
        {activeTab === "following" && <PostList />}
        {activeTab === "foryou" && (
          <PostList variant="foryou" sortBy={sortBy} />
        )}
      </PageWrapper>
    </>
  );
}
