import { useState } from "react";

import CreatePostForm from "@/pages/feed/components/CreatePostForm/CreatePostForm";
import PostList from "@/pages/feed/components/PostList/PostList";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import PageWrapper from "shared/ui/PageWrapper";

const ACTIVE_TAB_KEY = "feed_active_tab";
const SORT_BY_KEY = "feed_sort_by";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(ACTIVE_TAB_KEY) || "foryou";
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem(SORT_BY_KEY) || "latest";
  });
  const [showSortMenu, setShowSortMenu] = useState(false);

  const tabs = [
    { id: "foryou", label: "Для вас" },
    { id: "following", label: "Підписки" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    localStorage.setItem(ACTIVE_TAB_KEY, tabId);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    localStorage.setItem(SORT_BY_KEY, sort);
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
