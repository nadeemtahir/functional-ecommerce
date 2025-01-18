import Image from "next/image"


const Ceremics = () => {
    return (
         
      <div className="p-10 w-full pr-4">
        {/* Heading */}
        <div className="p-6 sm:p-10">
        <h1 className="text-start py-6 sm:py-10 mt-8 sm:mt-14 text-2xl sm:text-3xl text-[#2A254B]">
          New ceramics
        </h1>
      </div>
      {/* Images */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 sm:gap-8 justify-center p-6 sm:p-10">
        <div className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <Image
            src="/images/parent.png"
            alt="not found"
            width={305}
            height={462}
            className="w-auto h-auto"
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <Image
            src="/images/parent1.png"
            alt="not found"
            width={305}
            height={462}
            className="w-auto h-auto"
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <Image
            src="/images/parent2.png"
            alt="not found"
            width={305}
            height={462}
            className="w-auto h-auto"
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <Image
            src="/images/parent3.png"
            alt="not found"
            width={305}
            height={462}
            className="w-auto h-auto"
          />
        </div>
      </div>
      {/* Button */}
      <div className=" flex justify-center mt-6">
        <button className="bg-[#F9F9F9] px-6 py-3 text-lg rounded hover:bg-gray-200">
          View Collection
        </button>
      </div>


  {/* Popular Products Section */}
  <div className="w-full bg-[#ffffff] py-16 mt-16">
        {/* Heading */}
        <h1 className="ml-10 font-[Clash Display] font-normal text-3xl lg:text-4xl text-[#2A254B] mb-20">
          Our Popular Products
        </h1>

        {/* Images Section in one row */}
        <div className="flex flex-row gap-8 justify-center mt-8">
          <div className="w-full sm:w-1/2 lg:w-[620px]">
            <Image
              src="/images/parent4.png"
              alt="Popular Product 1"
              width={620}
              height={462}
              className="object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-[305px]">
            <Image
              src="/images/parent5.png"
              alt="Popular Product 2"
              width={305}
              height={462}
              className="object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-[305px]">
            <Image
              src="/images/parent6.png"
              alt="Popular Product 3"
              width={305}
              height={462}
              className="object-cover"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-[#F9F9F9] px-6 py-3 text-lg rounded hover:bg-gray-200">
            View Collection
          </button>
        </div>
      </div>





</div>
    );
  };
  
  export default Ceremics;