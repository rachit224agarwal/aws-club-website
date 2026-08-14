import React from "react";
import { Linkedin, Github } from "lucide-react";
import LazyImage from "../common/LazyImage";

export default function StandardMemberCard({ name, role, photoUrl, linkedin, github, history, isCaptain, getInitials }) {
  const isLeaderCard = isCaptain || role === "President" || role === "Vice President";

  const getFontSize = (str) => {
    if (!str) return "1.25rem";
    if (str.length > 21) return "1.0rem";
    if (str.length > 17) return "1.08rem";
    if (str.length > 14) return "1.16rem";
    return "1.25rem";
  };

  return (
    <>
      <div className={`aws-member-card h-full w-full mx-auto ${isLeaderCard ? "max-w-[344px]" : "max-w-[334px]"}`}>
        {/* Profile Photo */}
        <div
          className="shrink-0 flex items-center justify-center relative mt-1 select-none"
          style={{
            width: "148px",
            height: "148px",
            borderRadius: "50%",
            padding: "2.5px",
            background: "linear-gradient(135deg, #A26DFF 0%, #EA580C 100%)",
            boxShadow: "0 8px 22px rgba(0,0,0,.4), 0 0 18px rgba(162,109,255,0.2)",
          }}
        >
          {/* Inner dark spacer ring */}
          <div className="absolute inset-[2.5px] rounded-full bg-[#0E071A] z-0" />

          <div
            className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative z-10"
            style={{
              background: "#2A1B45",
              boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)",
            }}
          >
            {photoUrl ? (
              <LazyImage
                src={photoUrl}
                alt={name}
                className="w-full h-full rounded-full"
                imgClassName="object-cover"
              />
            ) : (
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "2.4rem",
                  fontWeight: 800,
                }}
              >
                {getInitials(name)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center w-full mt-3.5">
          {/* Member Name */}
          <h3
            style={{
              color: "#FFFFFF",
              fontSize: getFontSize(name),
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "8px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {name}
          </h3>

          {/* Role Badge */}
          <div style={{
            background: 'rgba(124, 58, 237, 0.15)',
            color: '#A855F7',
            border: '1px solid rgba(124,58,237,.35)',
            borderRadius: '999px',
            padding: '5px 13px',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: history ? '6px' : '0',
            whiteSpace: role && role.includes('\n') ? 'pre-line' : 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}>
            {role}
          </div>

          {/* History */}
          {history ? (
            <p style={{
              color: '#D8C9FF',
              fontSize: '0.78rem',
              fontStyle: 'italic',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              paddingRight: '4px'
            }}>
              {history}
            </p>
          ) : (
            <div style={{ height: '1.25rem' }} />
          )}
        </div>

        <div className="flex-grow" />

        {/* Social Icons & Divider */}
        <div className="w-full mt-3.5">
          <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', margin: '0 0 12px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} LinkedIn`}
                className="aws-social-btn linkedin"
              >
                <Linkedin size={18} strokeWidth={2} />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} GitHub`}
                className="aws-social-btn github"
              >
                <Github size={18} strokeWidth={2} />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
