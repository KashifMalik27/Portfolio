import ResumeActions from '@/components/ResumeActions';
import { resumeData } from '@/data/resumeData';

export const metadata = {
  title: 'Resume',
  description: 'View and download Malik Kashif resume.',
};

export default function ResumePage() {
  return <ResumeActions resumes={resumeData.map((resume) => resume)} />;
}
