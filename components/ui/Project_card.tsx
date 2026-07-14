"use client";

import { ArrowRightCircle, Clock, Calendar, ThumbsDown } from "lucide-react";

/**
 * ProjectCard
 * A single available-project card for the market research app.
 *
 * Props:
 *  - taskType         e.g. "Online task"
 *  - title            e.g. "Research Study"
 *  - description      e.g. "We look forward to having you participate!..."
 *  - amount           e.g. 10
 *  - currency         e.g. "USD"
 *  - duration         e.g. "10 min"
 *  - date             e.g. "Jul 14, 2026"
 *  - onNotInterested  callback when the user clicks "Not interested"
 */
type ProjectCardProps = {
  taskType?: string;
  title?: string;
  description?: string;
  amount?: number;
  currency?: string;
  duration?: string;
  date?: string;
  onNotInterested?: () => void;
};

export default function ProjectCard({
  taskType = "Online task",
  title = "Research Study",
  description = "We look forward to having you participate! Only the following devices are permitted for this study: Computer",
  amount = 10,
  currency = "USD",
  duration = "10 min",
  date = "Jul 14, 2026",
  onNotInterested,
}: ProjectCardProps) {
  return (
    <article className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Top row: task type + payout */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-orange-500">
          <ArrowRightCircle className="h-5 w-5" />
          <span className="text-sm font-medium text-gray-700">{taskType}</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-gray-900">${amount}</span>
          <span className="text-sm text-gray-400">{currency}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>

      {/* Bottom row: meta + action */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onNotInterested}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-800"
        >
          <ThumbsDown className="h-4 w-4" />
          <span>Not interested</span>
        </button>
      </div>
    </article>
  );
}