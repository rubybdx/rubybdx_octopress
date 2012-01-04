#!/usr/bin/env ruby

require "directory_watcher"
require 'eventmachine'
require "mini_magick"
require 'fileutils'


scan_directory="scans"
output_hd="book/images"
output_ld="book/images/thunbnails"

dw = DirectoryWatcher.new "./#{scan_directory}", :pre_load => true, :scanner => :em
dw.glob = "*"
dw.interval = 2.0
dw.stable = 2
dw.persist = "#{scan_directory}/.files_state.yml"
dw.add_observer do |*args|
  args.each do |event|
    puts event
    fpath=event.path
    src = File.expand_path(fpath)
    case event.type
    when :modified
      process_file(src,dest)
    when :added
      process_file(src,dest)
    when :removed
      puts "deleting #{dest}"
      #      File.delete(dest)
    end
    puts ' '
  end
end

def process_file(src)
  ld = File.expand_path(fpath.sub(/#{scan_directory}/,output_ld))
    hd = File.expand_path(fpath.sub(/#{scan_directory}/,output_hd))
    puts "src=#{src}"
  puts "ld=#{ld}"
  puts "hd=#{hd}"
  puts "-------"
  FileUtils.cp src, hd
  image = MiniMagick::Image.open src
  image.resize "100x100"
  image.write  ld
end

loop do
  dw.load!
  dw.run_once
  dw.persist!
  sleep dw.interval
end
