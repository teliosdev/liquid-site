#!/usr/bin/sh

pid=$(cat puma.pid)
count=0
run kill "$pid"
while kill -0 "$pid"; do
  if [ "$count" -gt 9 ]; then
    break
  fi

  count=$((var + 1))
  sleep 0.5
done

if kill -0 "$pid"; then
  echo "Failed to kill puma in time."
  exit 1
fi

run bundle exec puma --bind unix://test.sock -d -w 2 -t 0:4 --pidfile puma.pid

