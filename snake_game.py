"""
贪吃蛇游戏 - Python Turtle版
使用方向键控制蛇的移动
"""

import turtle
import random
import time

# 游戏配置
GAME_WIDTH = 600
GAME_HEIGHT = 600
GRID_SIZE = 20
DELAY = 0.1  # 游戏速度（越小越快）

class SnakeGame:
    def __init__(self):
        # 初始化屏幕
        self.screen = turtle.Screen()
        self.screen.title("贪吃蛇游戏")
        self.screen.bgcolor("black")
        self.screen.setup(width=GAME_WIDTH, height=GAME_HEIGHT)
        self.screen.tracer(0)  # 关闭自动刷新
        
        # 初始化蛇头
        self.head = turtle.Turtle()
        self.head.speed(0)
        self.head.shape("square")
        self.head.color("green")
        self.head.penup()
        self.head.goto(0, 0)
        self.head.direction = "stop"
        
        # 初始化食物
        self.food = turtle.Turtle()
        self.food.speed(0)
        self.food.shape("circle")
        self.food.color("red")
        self.food.penup()
        self.food.goto(0, 100)
        
        # 蛇身列表
        self.segments = []
        
        # 分数
        self.score = 0
        self.high_score = 0
        
        # 显示分数
        self.pen = turtle.Turtle()
        self.pen.speed(0)
        self.pen.shape("square")
        self.pen.color("white")
        self.pen.penup()
        self.pen.hideturtle()
        self.pen.goto(0, GAME_HEIGHT//2 - 40)
        self.update_score()
        
        # 绑定键盘事件
        self.screen.listen()
        self.screen.onkeypress(self.go_up, "Up")
        self.screen.onkeypress(self.go_down, "Down")
        self.screen.onkeypress(self.go_left, "Left")
        self.screen.onkeypress(self.go_right, "Right")
        self.screen.onkeypress(self.go_up, "w")
        self.screen.onkeypress(self.go_down, "s")
        self.screen.onkeypress(self.go_left, "a")
        self.screen.onkeypress(self.go_right, "d")
        
    def go_up(self):
        if self.head.direction != "down":
            self.head.direction = "up"
    
    def go_down(self):
        if self.head.direction != "up":
            self.head.direction = "down"
    
    def go_left(self):
        if self.head.direction != "right":
            self.head.direction = "left"
    
    def go_right(self):
        if self.head.direction != "left":
            self.head.direction = "right"
    
    def move(self):
        """移动蛇头"""
        if self.head.direction == "up":
            self.head.sety(self.head.ycor() + GRID_SIZE)
        elif self.head.direction == "down":
            self.head.sety(self.head.ycor() - GRID_SIZE)
        elif self.head.direction == "left":
            self.head.setx(self.head.xcor() - GRID_SIZE)
        elif self.head.direction == "right":
            self.head.setx(self.head.xcor() + GRID_SIZE)
    
    def check_collision(self):
        """检查碰撞"""
        # 检查是否撞墙
        if (self.head.xcor() > GAME_WIDTH//2 - GRID_SIZE or 
            self.head.xcor() < -GAME_WIDTH//2 + GRID_SIZE or
            self.head.ycor() > GAME_HEIGHT//2 - GRID_SIZE or 
            self.head.ycor() < -GAME_HEIGHT//2 + GRID_SIZE):
            return True
        
        # 检查是否撞到自己
        for segment in self.segments:
            if segment.distance(self.head) < GRID_SIZE:
                return True
        
        return False
    
    def update_score(self):
        """更新分数显示"""
        self.pen.clear()
        self.pen.write(f"分数: {self.score}  最高分: {self.high_score}", 
                       align="center", font=("Arial", 24, "normal"))
    
    def reset(self):
        """重置游戏"""
        time.sleep(1)
        self.head.goto(0, 0)
        self.head.direction = "stop"
        
        # 隐藏并清除蛇身
        for segment in self.segments:
            segment.goto(1000, 1000)
        self.segments.clear()
        
        # 重置分数
        if self.score > self.high_score:
            self.high_score = self.score
        self.score = 0
        self.update_score()
    
    def run(self):
        """主游戏循环"""
        while True:
            self.screen.update()
            
            # 检查碰撞
            if self.check_collision():
                self.reset()
            
            # 检查是否吃到食物
            if self.head.distance(self.food) < GRID_SIZE:
                # 移动食物到新位置
                x = random.randint(-GAME_WIDTH//2 + GRID_SIZE*2, GAME_WIDTH//2 - GRID_SIZE*2)
                y = random.randint(-GAME_HEIGHT//2 + GRID_SIZE*2, GAME_HEIGHT//2 - GRID_SIZE*2)
                # 对齐到网格
                x = (x // GRID_SIZE) * GRID_SIZE
                y = (y // GRID_SIZE) * GRID_SIZE
                self.food.goto(x, y)
                
                # 增加蛇身
                new_segment = turtle.Turtle()
                new_segment.speed(0)
                new_segment.shape("square")
                new_segment.color("lightgreen")
                new_segment.penup()
                self.segments.append(new_segment)
                
                # 增加分数
                self.score += 10
                self.update_score()
            
            # 移动蛇身（从后往前移动）
            for i in range(len(self.segments) - 1, 0, -1):
                x = self.segments[i-1].xcor()
                y = self.segments[i-1].ycor()
                self.segments[i].goto(x, y)
            
            # 移动第一个蛇身到蛇头位置
            if len(self.segments) > 0:
                x = self.head.xcor()
                y = self.head.ycor()
                self.segments[0].goto(x, y)
            
            self.move()
            time.sleep(DELAY)

if __name__ == "__main__":
    game = SnakeGame()
    game.run()
