export default function About() {
  return (
    <div className='p-8 flex flex-col gap-5 max-w-3xl mx-auto'>
      <div className='flex flex-col items-center'>
        <h1 className='font-bold text-3xl text-slate-700'>
          About SnakePliskin Estate
        </h1>
        <p className='font-bold text-slate-800'>
          <span className='text-slate-500'>Built By: </span>Rod Tolaresa Jr
          (rodtolaresa@yahoo.com)
        </p>{' '}
      </div>
      <p>
        I am excited to show my portfolio app designed to showcase my work,
        experience and skill. This app offers a seamless and intuitive user
        experience, enabling users to browse through an extensive database of
        listings with ease. Key features include advanced search functionality,
        allowing users to find keywords, price range, property type, and more.
        The app also includes powerful filtering options to help users narrow
        down their choices based on specific criteria such as number of
        bedrooms, bathrooms, parking and furnish.
      </p>

      <p>
        The development of this app leveraged a robust technology stack,
        including{' '}
        <span className='font-semibold text-slate-700 underline'>React</span>{' '}
        for building an interactive and responsive user interface,{' '}
        <span className='font-semibold text-slate-700 underline'>Node.js</span>{' '}
        for the backend server, and{' '}
        <span className='font-semibold text-slate-700 underline'>MongoDB</span>{' '}
        for efficient data storage and retrieval. Additionally, I incorporated{' '}
        <span className='font-semibold text-slate-700 underline'>
          Express.js
        </span>{' '}
        to streamline server-side logic and{' '}
        <span className='font-semibold text-slate-700 underline'>
          TailwindCSS
        </span>{' '}
        for a sleek and modern design.{' '}
        <span className='font-semibold text-slate-800'>
          This portfolio app not only highlights my technical expertise but also
          demonstrates my commitment to delivering high-quality digital
          experiences.
        </span>
      </p>
    </div>
  );
}
