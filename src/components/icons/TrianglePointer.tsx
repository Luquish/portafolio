interface TrianglePointerProps {
  color?: string;
  className?: string;
}

export default function TrianglePointer({ color = "#E8915B", className = "" }: TrianglePointerProps) {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 0L16 16H0L8 0Z" fill={color} />
    </svg>
  );
} 