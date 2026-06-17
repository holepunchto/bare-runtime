cmake_minimum_required(VERSION 4.0)

find_package(cmake-bare REQUIRED PATHS node_modules/cmake-bare)
find_package(cmake-fetch REQUIRED PATHS node_modules/cmake-fetch)

project(bare_runtime C)

fetch_package("github:holepunchto/bare@1.29.3")

add_custom_target(bare_runtime ALL DEPENDS bare_bin bare_shared)

bare_target(target)

install(
  TARGETS bare_bin bare_shared
  RUNTIME DESTINATION ${target}/bin
  LIBRARY DESTINATION ${target}/lib
  ARCHIVE DESTINATION ${target}/lib
)
