import {Link} from 'react-router-dom';
import problemlist from '../problemlist.json';

const Problemset = () => {
  const problems = problemlist.problemsetQuestionList;
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <h1 className="p-4 text-xl font-bold">Problems</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50 text-xs font-semibold uppercase text-gray-600 text-left">
            <th className="px-6 py-4">Id</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Acceptance</th>
            <th className="px-6 py-4">Difficulty</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {problems.map((problem) => (
            <tr key={problem.questionFrontendId} className="hover:bg-gray-50">
              <td className="px-6 py-4">{problem.questionFrontendId}</td>
              <td className="px-6 py-4">
                {/* Wrap the Title in a Link so it aligns under the header */}
                <Link 
                  to={`/Problem/${problem.questionFrontendId}`} 
                  className="text-blue-600 hover:underline"
                >
                  {problem.title}
                </Link>
              </td>
              <td className="px-6 py-4">{problem.acRate.toFixed(1)}%</td>
              <td className="px-6 py-4">{problem.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default Problemset;