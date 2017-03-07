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

int main(int argc, char **argv) {

    int camera = 0;
    bool decoded = false;

    VideoCapture video_capture(camera);
    if(!video_capture.isOpened()) {
        cerr << "Camera not found" << endl;
        exit(EXIT_FAILURE);
    }

    namedWindow("captured", CV_WINDOW_AUTOSIZE);

    ImageScanner scanner;
    scanner.set_config(ZBAR_NONE, ZBAR_CFG_ENABLE, 1);

    while(!decoded) {
        Mat frame, frame_grayscale;
        video_capture >> frame;

        cvtColor(frame, frame_grayscale, CV_BGR2GRAY);

        int width = frame_grayscale.cols;
        int height = frame_grayscale.rows;
        uchar *raw = (uchar *)(frame_grayscale.data);

        Image image(width, height, "Y800", raw, width * height);

        scanner.scan(image);

        //cout << "searching" << endl;

        int counter = 0;
        for (Image::SymbolIterator symbol = image.symbol_begin(); symbol != image.symbol_end(); ++symbol) {
            cout    << "decoded " << symbol->get_type_name()
                    << " symbol \"" << symbol->get_data() << '"' << endl;

            if (symbol->get_location_size() == 4) {
                line(frame, Point(symbol->get_location_x(0), symbol->get_location_y(0)), Point(symbol->get_location_x(1), symbol->get_location_y(1)), Scalar(0, 255, 0), 2, 8, 0);
                line(frame, Point(symbol->get_location_x(1), symbol->get_location_y(1)), Point(symbol->get_location_x(2), symbol->get_location_y(2)), Scalar(0, 255, 0), 2, 8, 0);
                line(frame, Point(symbol->get_location_x(2), symbol->get_location_y(2)), Point(symbol->get_location_x(3), symbol->get_location_y(3)), Scalar(0, 255, 0), 2, 8, 0);
                line(frame, Point(symbol->get_location_x(3), symbol->get_location_y(3)), Point(symbol->get_location_x(0), symbol->get_location_y(0)), Scalar(0, 255, 0), 2, 8, 0);
                decoded = true;
            }

            counter++;
        }

        imshow("captured", frame);

        image.set_data(NULL, 0);
        waitKey(30);

    }
    return 0;
}