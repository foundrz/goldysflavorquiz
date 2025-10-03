export default function Page() {
  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '20px' }}>
        🎯 Goldy&apos;s Strain Match Quiz
      </h1>
      <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '30px' }}>
        Your quiz is working! 🚀
      </p>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <p style={{ color: '#28a745', fontWeight: 'bold' }}>
          ✅ Deployment Successful!
        </p>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Next.js App Router is working perfectly
        </p>
      </div>
    </div>
  );
}