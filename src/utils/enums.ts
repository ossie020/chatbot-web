export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum Rating {
  LIMITED = 'limited',
  NSFW = 'NSFW',
}

export enum LoginModalState {
  CLOSED = 0,
  LOGIN = 1,
  REGISTER = 2,
  RESET = 3,
  CHECKOUT = 4,
}

export enum Plan {
  FREE = 101,
  STANDARD = 105,
  PREMIUM = 110,
}

export const PlanNameMapping: Record<number, string> = {
  101: 'Free',
  105: 'Standard',
  110: 'Premium',
}
