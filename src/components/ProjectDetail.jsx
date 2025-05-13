import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';


export const ProjectDetail = () => {   
  const { fetchProject }= useAuth();

  const { data: AllProject, isLoading: ProjectLoading, isError: projectError } = useQuery({
    queryKey: ['allProject'],
    queryFn: fetchProject,
  });

  console.log('AllProject:', AllProject);

  if (ProjectLoading) return <p>Loading project...</p>;
  if (projectError) return <p>Something went wrong while fetching the project.</p>;

  return (
    <>
      <div className="p-4">
    huhjghghgh
    </div>
    </>
  );
};
