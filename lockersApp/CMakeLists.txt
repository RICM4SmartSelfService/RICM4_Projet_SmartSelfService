cmake_minimum_required (VERSION 2.6)
project (ZBARCV)

set(CMAKE_CXX_STANDARD 11)

#find_package(libmongocxx REQUIRED)
#find_package(libbsoncxx REQUIRED)
#include_directories(${LIBMONGOCXX_INCLUDE_DIR})
#include_directories(${LIBBSONCXX_INCLUDE_DIR})
#include_directories("/usr/local/include/mongocxx/v_noabi")
#include_directories("/usr/local/include/bsoncxx/v_noabi")
#include_directories("/usr/local/include/libmongoc-1.0")
#include_directories("/usr/local/include/libbson-1.0")
#include_directories("/usr/local/lib")

#====================================================================================#

set(CMAKE_MODULE_PATH ${ZBARCV_SOURCE_DIR})
find_package (OpenCV)
find_package (ZBar0)
LINK_DIRECTORIES (${CMAKE_BINARY_DIR}/res)

add_executable (opencv qrdecoder.cpp)
target_link_libraries (opencv ${OpenCV_LIBRARIES} ${ZBAR_LIBRARIES} ${libmongoc})
#target_link_libraries(opencv ${LIBMONGOCXX_LIBRARIES})
#target_link_libraries(opencv ${LIBBSONCXX_LIBRARIES})
