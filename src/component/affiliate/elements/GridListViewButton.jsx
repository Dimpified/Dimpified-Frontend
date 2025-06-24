import { CiCircleList, CiGrid41 } from "react-icons/ci";
import { ButtonForTabs } from "../../Buttons";

const GridListViewButtonForTabs = ({ keyGrid, keyList }) => {
  return (
    <div className="flex space-x-2">
      <ButtonForTabs
        onClick={() => keyGrid()}
        className=" bg-white hover:text-primary4"
        label={
          <>
            <CiGrid41
              size={20}
              className="h-8 w-8 border border-gray-300 rounded"
            />
          </>
        }
      />

      <ButtonForTabs
        onClick={() => keyList()}
        className=" bg-white hover:text-primary4"
        label={
          <>
            {" "}
            <CiCircleList
              size={20}
              className="h-8 w-8 border border-gray-300 rounded"
            />
          </>
        }
      />
    </div>
  );
};

export default GridListViewButtonForTabs;
