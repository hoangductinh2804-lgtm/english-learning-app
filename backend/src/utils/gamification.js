const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const BADGE_DEFINITIONS = [
  {
    key: "first_points",
    title: "First Points",
    description: "Earn your first 10 points.",
    condition: (user) => user.points >= 10,
  },
  {
    key: "focused_learner",
    title: "Focused Learner",
    description: "Reach 100 points.",
    condition: (user) => user.points >= 100,
  },
  {
    key: "streak_3",
    title: "3-Day Streak",
    description: "Learn for 3 consecutive days.",
    condition: (user) => user.streak >= 3,
  },
  {
    key: "streak_7",
    title: "7-Day Streak",
    description: "Learn for 7 consecutive days.",
    condition: (user) => user.streak >= 7,
  },
  {
    key: "master_500",
    title: "Point Master",
    description: "Collect 500 points.",
    condition: (user) => user.points >= 500,
  },
];

function startOfDay(value) {
  const date = value ? new Date(value) : new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function updateStreak(user, activityDate = new Date()) {
  const today = startOfDay(activityDate);

  if (!user.lastActiveDate) {
    user.streak = 1;
    user.lastActiveDate = today;
    return;
  }

  const lastActive = startOfDay(user.lastActiveDate);
  const dayDiff = Math.round((today.getTime() - lastActive.getTime()) / ONE_DAY_MS);

  if (dayDiff <= 0) {
    return;
  }

  if (dayDiff === 1) {
    user.streak += 1;
  } else {
    user.streak = 1;
  }

  user.lastActiveDate = today;
}

function unlockBadges(user) {
  if (!Array.isArray(user.achievements)) {
    user.achievements = [];
  }

  const existingKeys = new Set((user.achievements || []).map((item) => item.key));

  for (const badge of BADGE_DEFINITIONS) {
    if (!existingKeys.has(badge.key) && badge.condition(user)) {
      user.achievements.push({
        key: badge.key,
        title: badge.title,
        description: badge.description,
        unlockedAt: new Date(),
      });
    }
  }
}

export async function applyGamification(user, { pointsEarned = 0, activityDate = new Date() } = {}) {
  user.points = Math.max(0, (user.points || 0) + pointsEarned);
  updateStreak(user, activityDate);
  unlockBadges(user);
  await user.save();
  return user;
}