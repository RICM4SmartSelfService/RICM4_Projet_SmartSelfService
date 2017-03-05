#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <zbar.h>
#include <iostream>
#include <iomanip>
#include <stdlib.h>

using namespace std;
using namespace cv;
using namespace zbar;

/**
 * QrCode decoding class
 * Implements a video capture with OpenCV
 * Uses ZBar to analyse image and decode the QR code
 */
class QrDecoder {
    private:
        int camera = 0; // The webcam ID (0 by default)
        int width, height; // Capture dimensions
        bool decoded = false; 
        const char *window; // Name of the capture window
        uchar *raw;
    
        ImageScanner scanner; // Image scanner that will analyse the capture
        Mat frame, frame_grayscale; // frames (colored, and grayscale) extracted from the video capture
    public:
        void run(char **code);
};

/**
 * The main function abble to decode the QRCode from the video input
 * @returns the code identified by ZBar in the video capture
 */
void QrDecoder::run (char **code) {

    // Initialisation of the webcam
    VideoCapture capture(camera);
    if(!capture.isOpened()) {
        cerr << "Camera not found." << endl;
        exit(EXIT_FAILURE);
    }

    // Creation of the debug window
    window = "capture";
    namedWindow(window, CV_WINDOW_AUTOSIZE);

    // Creation of the scanner
    scanner.set_config(ZBAR_NONE, ZBAR_CFG_ENABLE, 1);

    // Main loop that analyzes each frame.
    while(!decoded) {
        capture >> frame;
        cvtColor(frame, frame_grayscale, CV_BGR2GRAY);
        width = frame_grayscale.cols;
        height = frame_grayscale.rows;
        raw = (uchar *)(frame_grayscale.data);

        Image image(width, height, "Y800", raw, width * height);
        
        scanner.scan(image); // analyzes the frame

        int counter = 0;
        for (Image::SymbolIterator symbol = image.symbol_begin(); symbol != image.symbol_end(); ++symbol) {
            #ifndef NDEBUG
                cout    << "decoded " << symbol->get_type_name()
                        << " symbol \"" << symbol->get_data() << '"' << endl;
            #endif
            
            // transforms the std::string format to a char* format to match with a C program.
            int len = symbol->get_data().length();
            *code = new char [len+1];
            strcpy (*code, symbol->get_data().c_str());
                
            // debug printing to show the potential QRCode location
            #ifndef NDEBUG
                if (symbol->get_location_size() == 4) {
                    line(frame, Point(symbol->get_location_x(0), symbol->get_location_y(0)), Point(symbol->get_location_x(1), symbol->get_location_y(1)), Scalar(0, 255, 0), 2, 8, 0);
                    line(frame, Point(symbol->get_location_x(1), symbol->get_location_y(1)), Point(symbol->get_location_x(2), symbol->get_location_y(2)), Scalar(0, 255, 0), 2, 8, 0);
                    line(frame, Point(symbol->get_location_x(2), symbol->get_location_y(2)), Point(symbol->get_location_x(3), symbol->get_location_y(3)), Scalar(0, 255, 0), 2, 8, 0);
                    line(frame, Point(symbol->get_location_x(3), symbol->get_location_y(3)), Point(symbol->get_location_x(0), symbol->get_location_y(0)), Scalar(0, 255, 0), 2, 8, 0);
                }
            #endif
            counter++;
            
            decoded = true;
        }
        #ifndef NDEBUG
            imshow(window, frame); // print the frame in the capture screen
        #endif
        image.set_data(nullptr,0);
        waitKey(30); // limit frame per second (for the analyze)
    }
}

int main(int argc, char **argv) {
    QrDecoder qr;
    char *code;
    qr.run(&code);
    cout << code << endl;
    delete[] code;
}