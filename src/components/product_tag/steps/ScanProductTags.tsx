import React from 'react';
import QrReader from 'react-qr-reader'

const ScanProductTags = () => {
    return (
        <div>
            <QrReader
                delay={300}
                onError={() => console.error("error")}
                onScan={(data) => console.log("scanned: ", data)}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default ScanProductTags;