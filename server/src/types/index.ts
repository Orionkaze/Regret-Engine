export type SimulationMode = 'savage' | 'motivational' | 'reality'

export type DecisionCategory =
  | 'gym' | 'food' | 'sleep' | 'relationship'
  | 'study' | 'work' | 'finance' | 'social' | 'other'

export interface Timeline {
  day1: string
  week1: string
  month1: string
  year1: string
}

export interface MoodPoint {
  label: string;
  vibes: number;
}

export interface SimulationResult {
  outcomes: Timeline
  moodData: MoodPoint[]
  regretScore: number
  scoreLabel: string
  roastText: string
  category: DecisionCategory
}

export interface Decision {
  id: string
  userId: string | null
  decisionText: string
  personalityMode: SimulationMode
  regretScore: number
  outcomes: Timeline
  moodData: MoodPoint[]
  roastText: string
  category: DecisionCategory
  createdAt: string
}

export interface Profile {
  id: string
  username: string
  totalRegretScore: number
  decisionCount: number
  createdAt: string
}

export type ReactionType = 'skull' | 'fire' | 'sob' | 'relatable'
