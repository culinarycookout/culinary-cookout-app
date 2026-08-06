import { redirect } from 'next/navigation';

export default function FunRedirect() {
  redirect('/fun/login');
  return null;
}