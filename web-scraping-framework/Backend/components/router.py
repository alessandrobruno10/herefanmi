def execute_main_script(script_path, message_queue):
    try:
        print(script_path)
        # Execute the script
        exec(open(script_path).read())
    except Exception as e:
        print(f"An error occurred while running the script: {script_path}")
    finally:
        # Send a message to the queue indicating completion
        message_queue.put("COMPLETED")