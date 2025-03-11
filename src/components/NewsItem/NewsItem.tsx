interface NewsItemProps {
  abstract: string;
  web_url: string;
  multimedia: [];
  pub_date: string;
  source: string;
  _id: string;
}

export default function NewsItem({
  abstract,
  web_url,
  pub_date,
  source,
}: NewsItemProps) {
  return (
    <div className=" text-left border-b py-[15px]">
      <a
        href={web_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full gap-[10px]"
      >
        <img
          src="/src/assets/image.png"
          width={100}
          className="object-scale-down"
        />
        <div className="h-full flex flex-col gap-[8px]">
          <p className="font-bold text-[14px] text-blue-500">{source}</p>
          <p className="text-[16px]">{abstract}</p>
          <p className="text-[14px] text-neutral-400 mb-0 mt-auto">
            {new Date(pub_date).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      </a>
    </div>
  );
}
