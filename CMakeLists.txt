cmake_minimum_required(VERSION 4.0)

find_package(cmake-bare REQUIRED PATHS node_modules/cmake-bare)
find_package(cmake-fetch REQUIRED PATHS node_modules/cmake-fetch)

project(bare_runtime C)

fetch_package("github:holepunchto/bare@1.38.0")

add_custom_target(bare_runtime ALL)

add_dependencies(bare_runtime bare::executable bare::shared)

get_target_property(executable bare::executable ALIASED_TARGET)
get_target_property(shared bare::shared ALIASED_TARGET)

bare_target(target)

install(
  TARGETS ${executable} ${shared}
  RUNTIME DESTINATION ${target}/bin
  LIBRARY DESTINATION ${target}/lib
  ARCHIVE DESTINATION ${target}/lib
)
