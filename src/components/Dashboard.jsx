import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDistanceToNow } from 'date-fns';


export const Dashboard = () => {
     const { projectDetailCount, recentActivity, notification } = useAuth();

 // Use different query keys for each query
  const { data: projectData, isLoading: projectLoading, isError: projectError } = useQuery({
    queryKey: ['projectCount'],
    queryFn: projectDetailCount,
  });

  const { data: activityData, isLoading: activityLoading, isError: activityError } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: recentActivity,
  });

    const { data: notificationData, isLoading: notificationLoading, isError: notificationError } = useQuery({
    queryKey: ['notification'],
    queryFn: notification,
  });

  console.log('Project Data:', projectData);
  console.log('Activity Data:', activityData);
  console.log('notificationData:', notificationData);

  const data = [
  { name: 'Client A', projects: 5 },
  { name: 'Client B', projects: 2 },
  { name: 'Client C', projects: 6 },
];


  // console.log("data", data.data);

  // Handle loading and error states for each query
  if (projectLoading || activityLoading || notificationLoading) return <p>Loading...</p>;
  if (projectError || activityError || notificationError) return <p>Error loading data</p>;
  return (
   <>
    <main className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <DashboardCard title="Total Project"   value={projectData.data?.projectCount || '0'}  color="bg-blue-500" />
            <DashboardCard title="Revenue"   value={projectData.data?.revenue || '0'} color="bg-green-500" />
            <DashboardCard title="Pending" value="0%" color="bg-purple-500" />
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
            <div className="space-y-3">
<ul>
  {Array.isArray(activityData.data) && activityData.data.length > 0 ? (
    activityData.data.map((activity) => (
      <li key={activity._id}>
        <ActivityItem
          title={activity.title}
          time={`${formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}`}
          description={activity.description}
        />
      </li>
    ))
  ) : (
    <li>No activity found.</li>
  )}
</ul>



            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

             <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-medium mb-4">Project</h2>
      <p className="text-gray-600">Sample visualization of Project.</p>
      <div className="h-48 bg-gray-100 mt-4 rounded">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="projects" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Notifications</h2>
              <div className="space-y-3">
        
  {notificationData?.data?.map((iteme, index) => (
    <NotificationItem
      key={index}
      title={iteme.title}
      description={iteme.message}
      type={iteme.type} 
    />
  ))}


              </div>
            </div>
          </div>
        </main>
   </>
  )
}


function DashboardCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className={`${color} h-2`}></div>
      <div className="p-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function ActivityItem({ title, time, description }) {
  return (
    <div className="border-b border-gray-100 pb-2">
      <div className="flex justify-between">
        <h4 className="text-sm font-medium max-w-xs truncate">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-600 max-w-xs truncate">{description}</p>
    </div>
  );
}

function NotificationItem({ title, description, type }) {
  const colors = {
    info: "border-blue-500 bg-blue-50",
    warning: "border-yellow-500 bg-yellow-50",
    success: "border-green-500 bg-green-50",
    error: "border-red-500 bg-red-50"
  };
  
  return (
    <div className={`border-l-4 p-3 rounded ${colors[type]}`}>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}