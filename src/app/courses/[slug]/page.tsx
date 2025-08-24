export default function CourseDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  return <div>Course: {params.slug}</div>;
}
