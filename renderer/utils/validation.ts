const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

export function testEmail(email: string): boolean {
  return emailRegex.test(email);
}
