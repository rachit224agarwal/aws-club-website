import React from "react";
import FeaturedLeaderCard from "./FeaturedLeaderCard";
import StandardMemberCard from "./StandardMemberCard";

const MemberCard = React.memo(function MemberCard(props) {
  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const parts = fullName.split(" ").filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (props.isCurrentLeader) {
    return <FeaturedLeaderCard {...props} getInitials={getInitials} />;
  }

  return <StandardMemberCard {...props} getInitials={getInitials} />;
});

export default MemberCard;
